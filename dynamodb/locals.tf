locals {
    profile_data_file   = file("./data/profile-data.json")
    blog_data_file      = file("./data/blog-data.json")
    profile_data        = jsondecode(local.profile_data_file)
    blog_data           = jsondecode(local.blog_data_file)
}