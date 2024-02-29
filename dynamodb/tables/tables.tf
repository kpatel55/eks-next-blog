locals {
  table_names = toset([
    "Profiles",
    "Blogs",
    "Contacts"
  ])
}

resource "aws_dynamodb_table" "blog_tables" {
    for_each = local.table_names
    name           = "${each.key}"
    billing_mode   = "PROVISIONED"
    read_capacity  = 20
    write_capacity = 20
    hash_key       = "ID"

    attribute {
        name = "ID"
        type = "S"
    }

    tags = {
        Name = "${each.key} Table"
    }
}

output "tables_out" {
    value = {
        for v in aws_dynamodb_table.blog_tables :
        v.name => {
            "hash_key": v.hash_key,
            "arn": v.arn
        }
    }
}