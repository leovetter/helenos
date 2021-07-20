FROM postgres:latest

USER postgres

ENV POSTGRES_USER helenos
ENV POSTGRES_PASSWORD helenos
ENV POSTGRES_DB helenos
ENV PGDATA /var/lib/postgresql/data/pgdata

COPY init_helenos_schema.sql /docker-entrypoint-initdb.d/

EXPOSE 5432