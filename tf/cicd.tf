resource "aws_s3_bucket" "bucket_cicd" {
  bucket        = "lambda-ci-cd-sostpjs"
  force_destroy = true
}

resource "aws_s3_bucket_acl" "bucket_cicd_acl" {
  bucket = aws_s3_bucket.bucket_cicd.id
  acl    = "private"
}

resource "aws_s3_object" "init_script" {
  bucket = aws_s3_bucket.bucket_cicd.id
  key    = "init_shares.zip"
  acl    = "private"
  source = "shares.zip"
}

#resource "aws_cloudformation_stack" "sostp_js-shares_lambda" {
#  name = "lambda-demo-ci"
#
#  template_body = jsonencode({
#    Resources = {
#     LambdaCI  = {
#        Type = "AWS::Lambda::Function"
#        Properties = {
#          Code = {
#            S3Bucket = "lambda-ci-cd-sostpjs"
#            S3Key = "init_shares.zip"
#          }
#          Description = "This is CICD Lambda CF demo"
#          FunctionName = "lambda_demo_ci"
#          Handler = "not.used.in.provided.runtime"
#          MemorySize = 128
#          PackageType = "Zip"
#          Role = "arn:aws:iam::045949373633:role/student_lambda"
#          Runtime = "python3.9"
#        }
#      }
#    }
#  })
#}

resource "aws_iam_policy" "cicd_policy" {
  name        = "cicd_policy"
  path        = "/"
  description = "CI/CD pipeline policy"

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = [
                "cloudwatch:DescribeAlarms",
                "lambda:UpdateAlias",
                "lambda:GetAlias",
                "lambda:GetProvisionedConcurrencyConfig",
                "sns:Publish",
                "codestar-connections:UseConnection",
                "iam:PassRole"
        ]
        Effect    = "Allow"
        Resource  = "*"
      }, {
        Action = [
                "s3:GetObject",
                "s3:GetObjectVersion"
        ]
        Effect    = "Allow"
        Resource  = "*"
        Condition = {
                "StringEquals":  {
                    "s3:ExistingObjectTag/UseWithCodeDeploy": "true"
                }
            }
      },{
        Action    = [
                "lambda:InvokeFunction"
        ]
        Effect    = "Allow"
        Resource  = "arn:aws:lambda:*:*:function:CodeDeployHook_*"
      },{
        Action = [
                "logs:CreateLogGroup",
                "logs:CreateLogStream",
                "logs:PutLogEvents"
        ]
        Effect    = "Allow"
        Resource  = [
                "arn:aws:logs:us-east-1:*:log-group:/aws/codebuild/*",
                "arn:aws:logs:us-east-1:*:log-group:*:log-stream:*"
        ]
      }, {
        Action = [
                "s3:Get*",
                "s3:Put*",
                "s3:List*"
        ]
        Effect    = "Allow"
        Resource  = "arn:aws:s3:::lambda-ci-cd-sostpjs/*"
      }, {
        Action    = [
                "codebuild:CreateReportGroup",
                "codebuild:CreateReport",
                "codebuild:UpdateReport",
                "codebuild:BatchPutTestCases",
                "codebuild:BatchPutCodeCoverages",
        ]
        Effect    = "Allow"
        Resource  = "arn:aws:codebuild:us-east-1:*:report-group/sostp_js-shares*"
      }, {
        Action    = [
                "codebuild:*"
        ]
        Effect    = "Allow"
        Resource  = "arn:aws:codebuild:us-east-1:*:project/*"
      }, {
        Action    = [
                "cloudformation:*"
        ]
        Effect    = "Allow"
        Resource  = "arn:aws:cloudformation:us-east-1:*:stack/lambda-demo-ci/*"
      }
    ]
  })
}

resource "aws_iam_policy" "codebuild_policy" {
  name        = "codebuild_policy"
  path        = "/"
  description = "CodeBuild pipeline policy"

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = [
                "logs:CreateLogGroup",
                "logs:CreateLogStream",
                "logs:PutLogEvents"
        ]
        Effect    = "Allow"
        Resource  = [
                "arn:aws:logs:us-east-1:*:log-group:/aws/codebuild/*",
                "arn:aws:logs:us-east-1:*:log-group:*:log-stream:*"
        ]
      }, {
        Action = [
                "s3:PutObject",
                "s3:GetObject",
                "s3:GetObjectVersion",
                "s3:GetBucketAcl",
                "s3:GetBucketLocation",
                "s3:List*"
        ]
        Effect    = "Allow"
        Resource  = "arn:aws:s3:::lambda-ci-cd-sostpjs/*"
      }, {
        Action    = [
                "codebuild:CreateReportGroup",
                "codebuild:CreateReport",
                "codebuild:UpdateReport",
                "codebuild:BatchPutTestCases",
                "codebuild:BatchPutCodeCoverages"
        ]
        Effect    = "Allow"
        Resource  = "arn:aws:codebuild:us-east-1:*:report-group/sostp_js-shares*"
      }, {
        Action    = [
                "cloudformation:*"
        ]
        Effect    = "Allow"
        Resource  = "arn:aws:cloudformation:us-east-1:*:stack/lambda-demo-ci/*"
      }, {
        Action    = [
                "lambda:*"
        ]
        Effect    = "Allow"
        Resource  = "*"
      }
    ]
  })
}


resource "aws_iam_policy" "codedeploy_policy" {
  name        = "codedeploy_policy"
  path        = "/"
  description = "CodeDeploy pipeline policy"

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = [
                "logs:CreateLogGroup",
                "logs:CreateLogStream",
                "logs:PutLogEvents"
        ]
        Effect    = "Allow"
        Resource  = [
                "arn:aws:logs:us-east-1:*:log-group:/aws/codebuild/*",
                "arn:aws:logs:us-east-1:*:log-group:*:log-stream:*"
        ]
      }, {
        Action = [
                "s3:*"
        ]
        Effect    = "Allow"
        Resource  = "*"
      }, {
        Action    = [
                "codedeploy:*",
        ]
        Effect    = "Allow"
        Resource  = "arn:aws:codedeploy:us-east-1:*:report-group/sostp_js-shares*"
      }
    ]
  })
}

resource "aws_iam_policy" "cloudformation_policy" {
  name        = "cloudformation_policy"
  path        = "/"
  description = "CI/CD cloudformation policy"

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = [
                "s3:GetObject",
                "s3:GetObjectVersion"
        ]
        Effect    = "Allow"
        Resource  = "*"
      }, {
        Action = [
                "s3:Get*",
                "s3:Put*",
                "s3:List*"
        ]
        Effect    = "Allow"
        Resource  = "arn:aws:s3:::lambda-ci-cd-sostpjs/*"
      }, {
        Action    = [
                "cloudformation:*"
        ]
        Effect    = "Allow"
        Resource  = "arn:aws:cloudformation:us-east-1:*:stack/lambda-demo-ci/*"
      }, {
        Action    = [
                "lambda:*"
        ]
        Effect    = "Allow"
        Resource  = "*"
      }
    ]
  })
}

resource "aws_iam_role" "pipeline_role" {
  name = "sostp_js-pipeline_role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
        {
            Effect = "Allow",
            Principal = {
                Service = "codepipeline.amazonaws.com"
            },
            Action = "sts:AssumeRole"
        }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "pipeline-attach" {
  role       = aws_iam_role.pipeline_role.name
  policy_arn = aws_iam_policy.cicd_policy.arn
}

resource "aws_iam_role" "codebuild_role" {
  name = "codebuild_role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "codebuild.amazonaws.com"
        }
      },
    ]
  })
}

resource "aws_iam_role_policy_attachment" "codebuild-policy-attach" {
  role       = aws_iam_role.codebuild_role.name
  policy_arn = aws_iam_policy.codebuild_policy.arn
}

resource "aws_iam_role" "codedeploy_role" {
  name = "codedeploy_role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "codedeploy.us-east-1.amazonaws.com"
        }
      },
    ]
  })
}

resource "aws_iam_role" "cloudformation_role" {
  name = "cloudformation_role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "cloudformation.amazonaws.com"
        }
      },
    ]
  })
}

resource "aws_iam_role_policy_attachment" "codedeploy-policy-attach" {
  role       = aws_iam_role.codedeploy_role.name
  policy_arn = aws_iam_policy.codedeploy_policy.arn
}

resource "aws_iam_role_policy_attachment" "cloudformation-policy-attach" {
  role       = aws_iam_role.cloudformation_role.name
  policy_arn = aws_iam_policy.cloudformation_policy.arn
}

resource "aws_codebuild_project" "sostpjs" {
  name          = "sostp_js-shares"
  description   = "This is testing of GitHub sostp_js shares"
  build_timeout = "5"
  service_role  = aws_iam_role.codebuild_role.arn

  artifacts {
    type      = "S3"
    location  = aws_s3_bucket.bucket_cicd.id
    name      = "shares.zip" 
    path      = "CodeDeploy/"
  }

  environment {
    compute_type                = "BUILD_GENERAL1_SMALL"
    image                       = "aws/codebuild/standard:4.0"
    type                        = "LINUX_CONTAINER"
    image_pull_credentials_type = "CODEBUILD"
  }

  logs_config {
    cloudwatch_logs {
      group_name  = "log-group"
      stream_name = "log-stream"
    }
  }

  source {
    type            = "GITHUB"
    location        = "https://github.com/mirozoe/sostp_js.git"
    git_clone_depth = 1
    buildspec       = "tf/src/buildspec.yml"

    git_submodules_config {
      fetch_submodules = false
    }
  }

  source_version = "main"
}

resource "aws_codedeploy_app" "codedeploy-sostp_js" {
  compute_platform = "Lambda"
  name             = "github-sostp_js"
}

resource "aws_codedeploy_deployment_group" "example" {
  app_name                = aws_codedeploy_app.codedeploy-sostp_js.name
  deployment_group_name   = "sostp_js"
  deployment_config_name  = "CodeDeployDefault.LambdaAllAtOnce"
  service_role_arn        = aws_iam_role.codedeploy_role.arn

  deployment_style {
    deployment_option = "WITH_TRAFFIC_CONTROL"
    deployment_type   = "BLUE_GREEN"
  }
}

resource "aws_codepipeline" "codepipeline" {
  name     = "sostp_js-shares-pipeline"
  role_arn = aws_iam_role.pipeline_role.arn

  artifact_store {
    location = aws_s3_bucket.bucket_cicd.bucket
    type     = "S3"
  }

  stage {
    name = "Source"

    action {
      name             = "Source"
      category         = "Source"
      owner            = "AWS"
      provider         = "CodeStarSourceConnection"
      version          = "1"
      output_artifacts = ["source_output"]

      configuration = {
        ConnectionArn    = data.aws_codestarconnections_connection.github-sostp_js.arn
        FullRepositoryId = "mirozoe/sostp_js"
        BranchName       = "main"
      }
    }
  }

  stage {
    name = "Build"

    action {
      name             = "Build"
      category         = "Build"
      owner            = "AWS"
      provider         = "CodeBuild"
      input_artifacts  = ["source_output"]
      output_artifacts = ["build_output"]
      version          = "1"

      configuration = {
        ProjectName = "sostp_js-shares"
      }
    }
  }

  stage {
    name = "Deploy"

    action {
      name            = "Deploy"
      category        = "Deploy"
      owner           = "AWS"
      provider        = "CloudFormation"
      input_artifacts = ["build_output"]
      version         = "1"

      configuration = {
        ActionMode     = "CREATE_UPDATE"
        Capabilities   = "CAPABILITY_AUTO_EXPAND,CAPABILITY_IAM"
        OutputFileName = "CreateStackOutput.json"
        StackName      = "lambda-demo-ci"
        TemplatePath   = "build_output::lambda_cf.yaml"
        RoleArn        = aws_iam_role.cloudformation_role.arn
      }
    }
  }
}


data "aws_codestarconnections_connection" "github-sostp_js" {
  name = "github-sostp_js"
}

output "s3" {
  value = aws_s3_bucket.bucket_cicd.id
}
