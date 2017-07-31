# itzgio-jenkins

This repository contains a custom docker image from Jenkins image, which is configured with the latest version of Jenkins (2.60.2). The Jenkins configuration polls from a github repository, checkouts on changes and builds a docker image from source. Then it pushes the image to docker hub, registers a new revision of an aws ecs task definition and updates an aws ecs service using the last version of the task definition.
