provider "aws" {
    region = "us-east-1"
}

module "table_module" {
    source = "./tables"
}

resource "aws_dynamodb_table_item" "blog_item" {
    for_each    = local.blog_data
    table_name  = "Blogs"
    hash_key    = module.table_module.tables_out["Blogs"]["hash_key"]
    item        = jsonencode(each.value)
    depends_on = [ module.table_module ]
}

resource "aws_dynamodb_table_item" "profile_item" {
    for_each    = local.profile_data
    table_name  = "Profiles"
    hash_key    = module.table_module.tables_out["Profiles"]["hash_key"]
    item        = jsonencode(each.value)
    depends_on = [ module.table_module ]
}

resource "aws_iam_policy" "eks_dynamodb_policy" {
    name        = "EKSDynamoDB"
    description = "Allows EKS pods to access DynamoDB tables via service account"

    policy = jsonencode({
        "Version": "2012-10-17",
        "Statement": [
            {
                "Sid": "EKSDynamoDB",
                "Effect": "Allow",
                "Action": [
                    "dynamodb:GetItem",
                    "dynamodb:Scan",
                    "dynamodb:PutItem"
                ],
                "Resource": [
                    for v in module.table_module.tables_out :
                    v.arn
                ]
            }
        ]
    })
    depends_on = [ module.table_module ]
}

output "iam_out" {
  value = [aws_iam_policy.eks_dynamodb_policy.arn]
}