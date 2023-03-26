resource "aws_s3_bucket" "bucket" {
  bucket        = "lambda-ci-cd-sostpjs"
  force_destroy = true
}

resource "aws_s3_bucket_acl" "bucket_acl" {
  bucket = aws_s3_bucket.bucket.id
  acl    = "private"
}

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
                "sns:Publish"
        ]
        Effect    = "Allow"
        Resource  = "*"
      }, {
        Action = [
                "s3:GetObject",
                "s3:GetObjectVersion"
        ]
        Effect    = "Allow"
        Resource  = "arn:aws:s3:::lambda-ci-cd-sostpjs/CodeDeploy/*"
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
                "arn:aws:logs:us-east-1:*:log-group:/aws/codebuild/github-sostp_js",
                "arn:aws:logs:us-east-1:*:log-group:/aws/codebuild/github-sostp_js:*"
        ]
      }, {
        Action = [
                "s3:PutObject",
                "s3:GetObject",
                "s3:GetObjectVersion",
                "s3:GetBucketAcl",
                "s3:GetBucketLocation"
        ]
        Effect    = "Allow"
        Resource  = "arn:aws:s3:::lambda-ci-cd-sostpjs/CodeDeploy/*"
      }, {
        Action    = [
                "codebuild:CreateReportGroup",
                "codebuild:CreateReport",
                "codebuild:UpdateReport",
                "codebuild:BatchPutTestCases",
                "codebuild:BatchPutCodeCoverages"
        ]
        Effect    = "Allow"
        Resource  = "arn:aws:codebuild:us-east-1:*:report-group/github-sostp_js-*"
      }
    ]
  })
}

resource "aws_iam_role" "codebuild_role" {
  name = "codebuild_role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Sid    = ""
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

output "s3" {
  value = aws_s3_bucket.bucket.id
}
