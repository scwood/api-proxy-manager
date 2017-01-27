### Edit these variables ###
IMG_NAME=node-starter
PORT=8080
TAG=latest
VOLUME_TO_MOUNT=$(shell pwd)
SET_NODE_ENV=development
### End of edit ###

IMG=registry-app.eng.qops.net:5001/profserv/projects/$(IMG_NAME)
CONTAINER=$(IMG_NAME)
RUNOPTS=-p $(PORT):80
VOLUME_DESTINATION=/home/default

build:
	docker build --pull -t $(IMG):$(TAG) --build-arg SET_NODE_ENV=$(SET_NODE_ENV) ./.

run-enter: rm
	docker run -it $(RUNOPTS) --name $(CONTAINER) -v $(VOLUME_TO_MOUNT):$(VOLUME_DESTINATION) -e QUALTRICSHOSTNAME=dev $(IMG):$(TAG) /bin/bash

run-dev: rm
	docker run -d $(RUNOPTS) --name $(CONTAINER) -v $(VOLUME_TO_MOUNT):$(VOLUME_DESTINATION) -e QUALTRICSHOSTNAME=dev $(IMG):$(TAG) npm run start-dev

run-prod: rm
    docker run -d $(RUNOPTS) --name $(CONTAINER) -e QUALTRICSHOSTNAME=dev $(IMG):$(TAG) npm run start-prod

push:
	docker push $(IMG):$(TAG)

test: rm
	docker run $(RUNOPTS) --name $(CONTAINER) --rm -e QUALTRICSHOSTNAME=dev $(IMG):$(TAG) npm test

rm:
	docker rm -f $(CONTAINER) || true

enter:
	docker exec -it $(CONTAINER) /bin/bash