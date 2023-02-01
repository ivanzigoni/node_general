docker container stop my-postgres
docker container prune --force
docker run -d -p 5432:5432 --name my-postgres -e POSTGRES_PASSWORD=mysecretpassword postgres:latest