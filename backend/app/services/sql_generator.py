from langchain_anthropic import ChatAnthropic
from langchain_core.prompts import ChatPromptTemplate
from app.core.config import settings


class SQLGenerator:
    def __init__(self):
        self.llm = ChatAnthropic(
            model="claude-3-5-sonnet-20241022",
            temperature=0,
            api_key=settings.ANTHROPIC_API_KEY
        )
        
        self.prompt = ChatPromptTemplate.from_messages([
            ("system", "You are a SQL expert. Generate PostgreSQL queries based on the user's question and the provided schema context.\n\nRules:\n- Use proper PostgreSQL syntax\n- Only use tables and columns mentioned in the schema context\n- Use appropriate joins based on relationships in the schema\n- Return only the SQL query, no explanations\n- Use LIMIT to prevent large result sets"),
            ("human", "Schema Context:\n{{schema_context}}\n\nUser Question: {{question}}\n\nGenerate SQL:")
        ])

    async def generate_sql(self, question: str, schema_context: str) -> str:
        chain = self.prompt | self.llm
        result = await chain.ainvoke({
            "schema_context": schema_context,
            "question": question
        })
        
        # Extract SQL from response
        sql = result.content.strip()
        
        # Remove markdown code blocks if present
        if sql.startswith("```"):
            sql = sql.split("```")[1]
            if sql.startswith("sql"):
                sql = sql[3:]
        
        return sql.strip()
