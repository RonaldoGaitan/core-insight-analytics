from langchain_anthropic import ChatAnthropic
from langchain.prompts import ChatPromptTemplate
from app.core.config import settings
import json


class VisualizationService:
    def __init__(self):
        self.llm = ChatAnthropic(
            model="claude-3-5-sonnet-20241022",
            temperature=0,
            api_key=settings.ANTHROPIC_API_KEY
        )
        
        self.prompt = ChatPromptTemplate.from_messages([
            ("system", """You are a data visualization expert. Generate Plotly.js configuration based on the data and question.

Return a JSON object with this structure:
{
  "data": [
    {
      "type": "bar" or "line" or "pie" or "scatter",
      "x": [column values],
      "y": [column values],
      "name": "series name"
    }
  ],
  "layout": {
    "title": "chart title",
    "xaxis": {"title": "x label"},
    "yaxis": {"title": "y label"}
  }
}

Choose the best chart type based on the data and question."""),
            ("human", """Data:
{data}

Question: {question}

Generate visualization JSON:""")
        ])

    async def generate_visualization(self, data: list, question: str) -> dict:
        if not data or len(data) == 0:
            return None
        
        chain = self.prompt | self.llm
        result = await chain.ainvoke({
            "data": json.dumps(data[:10]),  # Limit for context
            "question": question
        })
        
        # Extract JSON from response
        content = result.content.strip()
        
        # Remove markdown code blocks if present
        if content.startswith("```"):
            content = content.split("```")[1]
            if content.startswith("json"):
                content = content[4:]
        
        try:
            viz_config = json.loads(content.strip())
            # Add actual data
            if "data" in viz_config and len(viz_config["data"]) > 0:
                # This is a simplified version - in production, you'd map actual columns
                pass
            return viz_config
        except json.JSONDecodeError:
            return None
