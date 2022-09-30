FROM ubuntu:20.04

COPY requirements.txt /tmp

RUN apt update || : && apt install curl python3 python3-pip python3.8-venv -y
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
RUN apt install -y nodejs
RUN npm i -g serve
RUN python3 -m venv api/venv
RUN . api/venv/bin/activate
RUN pip3 install -r /tmp/requirements.txt

EXPOSE 3000
EXPOSE 5000

WORKDIR /app
#COPY . /app
#CMD ["bash", "run.sh"]
ENTRYPOINT ["./run.sh"]