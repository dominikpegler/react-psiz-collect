FROM debian:bullseye

RUN apt update || : && apt install curl -y
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
RUN apt install -y nodejs
RUN npm i -g serve

EXPOSE 80

WORKDIR /app

CMD ["serve", "-l", "8080"]
