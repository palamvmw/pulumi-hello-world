# node-hello-world
## How to run *node-hello-world* pulumi app on MacOS
1. Install pulumi

    ```
    brew install pulumi/tap/pulumi
    ```

2. Install nodejs

    ```
    brew install node
    ```

3. [Install kubernetes cluster using docker desktop](https://medium.com/backbase/kubernetes-in-local-the-easy-way-f8ef2b98be68)

    This should create an entry in your /etc/hosts as below
    ```
    # Added by Docker Desktop
    # To allow the same kube context to work on the host and the container:
    127.0.0.1 kubernetes.docker.internal
    # End of section
    ```



4. Create a folder and unzip the code.
    ```
    mkdir pulumi && cd pulumi
    unzip node-hello-world
    cd node-hello-world
    ```

4. Deploy the app into k8s cluster using the following command

```
    pulumi up --logtostderr
```
You should see something similar on your console as shown below when app gets deployed in k8s cluster.

``` 
     Type                              Name                     Status
 +   pulumi:pulumi:Stack               hello-world-hello-world  created (0.70s)
 +   ├─ kubernetes:core/v1:Namespace   hello-app                created (0.18s)
 +   ├─ kubernetes:core/v1:ConfigMap   hello-app                created (0.17s)
 +   ├─ kubernetes:core/v1:Service     hello-app                created (10s)
 +   └─ kubernetes:apps/v1:Deployment  hello-app                created (2s)


Resources:
    + 5 created

Duration: 13s
```

## Test application
Copy the following URL into your browser 
```
http://kubernetes.docker.internal/hello
```
You should be able to see similar output.

```
Hello from the Kubernetes worker node with IP address: 192.168.65.4
```
![hello](hello.png)
------------------
## Building and Updating NodeJS Application
This repository contains a nodejs application under `app` directory. It hosts the endpoint `/hello`, which
returns a pre-configured message and IP address of the node where the application pod is running.

* To build node js application docker container run the following command.

    ```
    docker build . -t node-hello-world
    ```
* Tag the image
    ```
    docker tag node-hello-world:latest <your-repo>/node-hello-world:latest
    ```

* Push the docker image into  a docker repository
    ```
    docker push <your-repo>/node-hello-world:latest
    ```
