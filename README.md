# Deploy Next.js Blog to EKS Demo

A simple demo of deploying a full-stack blog application to EKS.
Before you continue, be sure to install Terraform, kubectl, and eksctl,
and view the pricing details for running an EKS cluster.

## Usage

### Deployment

In order to deploy the app, you'll need to first provision an EKS cluster and associate an OIDC provider to your AWS account. Be sure to provide the region you're deploying to:

```
eksctl create cluster --name next-node-blog --region YOUR_REGION_NAME
eksctl utils associate-iam-oidc-provider --region=YOUR_REGION_NAME --cluster=next-node-blog --approve
```

Next, deploy the DynamoDB tables and policy:

```
cd dynamodb
terraform init
terraform apply
```

After running terraform apply, you should see output similar to:

```bash
Apply complete! Resources: 9 added, 0 changed, 0 destroyed.

Outputs:

iam_out = [
  YOUR_IAM_POLICY,
]
```

Copy the arn of the IAM policy from the output, and use the attach-policy-arn option to create an EKS service account:

```
eksctl create iamserviceaccount --name eks-dynamodb-srv-acct --namespace default --cluster next-node-blog --role-name eks-dynamodb-role --attach-policy-arn YOUR_IAM_POLICY --approve
```

After the service account is created, the backend Node application can be deployed:

```
cd ../backend
kubectl apply -f deployment.yaml
```

And finally, deploy the Next.js frontend:

```
cd ../frontend
kubectl apply -f deployment.yaml
```

### Navigate

After successful deployment, you can find the url of the application by running:

```
kubectl get svc next-react-blog
```

Copy/Paste the url under EXTERNAL-IP to a browser window for viewing the deployed app.

### Cleanup

```
eksctl delete cluster --name next-node-blog --region YOUR_REGION_NAME
cd ../dynamodb
terraform destroy
```
