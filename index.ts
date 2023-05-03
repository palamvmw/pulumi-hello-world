import * as pulumi from "@pulumi/pulumi";
import * as k8s from "@pulumi/kubernetes";
import * as kx from "@pulumi/kubernetesx";

const appName = "hello-app";
const appLabels = { app: appName };

// Create a Kubernetes namespace for the application.
const namespace = new k8s.core.v1.Namespace(appName, {
    metadata: { name: appName },
});

// Create a ConfigMap to hold the application configuration.
const configMap = new k8s.core.v1.ConfigMap(appName, {
    metadata: { namespace: namespace.metadata.name },
    data: {
        message: "Hello from the Kubernetes worker node with IP address: ",
    },
});

// Create a Deployment to manage the application Pods.
const deployment = new k8s.apps.v1.Deployment(appName, {
    metadata: { namespace: namespace.metadata.name },
    spec: {
        selector: { matchLabels: appLabels },
        replicas: 1,
        template: {
            metadata: { labels: appLabels },
            spec: {
                containers: [
                    {
                        name: appName,
                        image: "docker.io/amitpal9/node-hello-world:latest",
                        ports: [{ name: "http", containerPort: 9090 }],
                        env: [
                            {
                                name: "MESSAGE",
                                valueFrom: {
                                    configMapKeyRef: {
                                        name: configMap.metadata.name,
                                        key: "message",
                                    },
                                }
                            },
                            {
                                name: "NODE_IP",
                                valueFrom: {
                                    fieldRef: {
                                        fieldPath: "status.hostIP",
                                    },
                                },
                            },
                        ],
                    },
                ],
            },
        },
    },
});

// Create a Kubernetes service for the application.
const service = new k8s.core.v1.Service(appName, {
    metadata: { namespace: namespace.metadata.name },
    spec: {
        type: "LoadBalancer",
        ports: [{ port: 80, targetPort: 9090, protocol: "TCP" }],
        selector: appLabels,
    },
});