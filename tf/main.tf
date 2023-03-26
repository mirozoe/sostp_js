terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
    }
    archive = {
      source = "hashicorp/archive"
      version = "2.3.0"
    }
  }
}

provider "aws" {
  region = "us-east-1"
}

resource "aws_iam_policy" "students_policy" {
  name        = "students_policy"
  path        = "/"
  description = "Student's policy"

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = [
                "iam:ListRoles",
                "iam:PassRole",
                "lambda:ListFunctions",
                "lambda:ListEventSourceMappings",
                "lambda:ListTags",
                "lambda:GetAccountSettings",
                "cloudwatch:GetMetricStatistics",
                "cloudwatch:GetMetricData" 
        ]
        Effect    = "Allow"
        Resource  = "*"
      }, {
        Action = [
                "lambda:DeleteEventSourceMapping",
                "lambda:UpdateEventSourceMapping",
                "lambda:CreateEventSourceMapping",
        ]
        Effect    = "Allow"
        Resource  = "*"
        Condition = {
            "StringLike": {
                "lambda:FunctionArn": "arn:aws:lambda:us-east-1:*:function:student-*"
            }
        }
      },{
        Action = [
                "lambda:GetEventSourceMapping",
                "lambda:GetFunction",
                "lambda:GetFunctionConfiguration",
                "lambda:GetFunctionCodeSigningConfig",
                "lambda:GetFunctionConcurrency",
                "lambda:GetFunctionUrlConfig",
                "lambda:ListFunctionUrlConfigs",
                "lambda:PublishLayerVersion",
                "lambda:GetLayerVersion",
                "lambda:DeleteLayerVersion",
                "lambda:InvokeFunction",
                "lambda:CreateFunction",
                "lambda:UpdateFunctionCode",
                "lambda:AddPermission",
                "lambda:ListAliases",
                "lambda:CreateFunctionUrlConfig",
                "lambda:InvokeFunctionUrl",
                "lambda:UpdateFunctionUrlConfig",
                "lambda:DeleteFunction",
                "lambda:DeleteFunctionUrlConfig",
        ]
        Effect    = "Allow"
        Resource  = "arn:aws:lambda:us-east-1:*:function:student-*"
      },{
        Action    = [
                "logs:*"
        ]
        Effect    = "Allow"
        Resource  = "arn:aws:logs:*:*:log-group:/aws/lambda/student-*"
      }
    ]
  })
}

resource "aws_iam_user" "student" {
  for_each = toset( var.students )
  name      = each.value
}

resource "aws_iam_user_login_profile" "student_pass" {
  for_each        = { for u in aws_iam_user.student : u.name => u }
  user            = each.value.name
  password_length = 8
}

resource "aws_iam_group" "students" {
  name = "students"
  path = "/students/"
}

resource "aws_iam_group_membership" "students_memebership" {
  name = "students-membership"
  users = [ for u in aws_iam_user.student : u.name ]
  group = aws_iam_group.students.name
}

resource "aws_iam_group_policy_attachment" "students_policy" {
  group      = aws_iam_group.students.name
  policy_arn = aws_iam_policy.students_policy.arn
}

output "student1_pass" {
  value = [ for p in aws_iam_user_login_profile.student_pass : p.password ]
}

