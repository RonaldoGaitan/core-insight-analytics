import asyncio
import sys
import os

# Add parent directory to path
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app.services.profiling.profiling_service import ProfilingService


async def main():
    """Profile database tables and generate embeddings"""
    
    # Get tenant_id from command line or use default
    tenant_id = sys.argv[1] if len(sys.argv) > 1 else 'demo-tenant'
    
    # Get table names from command line or use defaults
    if len(sys.argv) > 2:
        table_names = sys.argv[2:]
    else:
        table_names = ['dim_customer', 'fct_transaction', 'shopify_orders', 'shopify_customers']
    
    print(f"Profiling tables for tenant: {tenant_id}")
    print(f"Tables: {', '.join(table_names)}")
    print("This may take a few minutes...\n")
    
    profiler = ProfilingService()
    
    try:
        await profiler.profile_database(table_names, tenant_id)
        print("\n✓ Profiling complete!")
        print(f"✓ Metadata and embeddings stored for {len(table_names)} tables")
    except Exception as e:
        print(f"\n✗ Error during profiling: {e}")
        import traceback
        traceback.print_exc()


if __name__ == "__main__":
    asyncio.run(main())
