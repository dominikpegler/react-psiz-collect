FROM python:3.9-bullseye


COPY requirements.txt /tmp

RUN pip install --no-cache-dir --upgrade -r /tmp/requirements.txt
RUN apt update || : && apt install curl -y
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
RUN apt install -y nodejs
RUN npm i -g serve

EXPOSE 5000
EXPOSE 3000

WORKDIR /app

CMD ["./run.sh"]