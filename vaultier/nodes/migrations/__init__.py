from django.db import connection


def workspace_exists():
    """
    Check whether workspace table exists

    :return:
    """
    cursor = connection.cursor()
    cursor.execute("SELECT EXISTS ( SELECT 1 FROM pg_catalog.pg_class c "
                   "JOIN pg_catalog.pg_namespace n ON n.oid = c.relnamespace "
                   "WHERE  n.nspname = 'public' "
                   "AND c.relname = 'vaultier_workspace' );")
    return cursor.fetchone()[0]