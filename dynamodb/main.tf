provider "aws" {
    region = "us-east-1"
}

module "table_module" {
    source = "./tables"
}

resource "aws_dynamodb_table_item" "blog_item" {
    for_each    = local.blog_data
    table_name  = "Blogs"
    hash_key    = module.table_module.tables_out["Blogs"]
    item        = jsonencode(each.value)
}

resource "aws_dynamodb_table_item" "profile_item" {
    for_each    = local.profile_data
    table_name  = "Profiles"
    hash_key    = module.table_module.tables_out["Profiles"]
    item        = jsonencode(each.value)
}
