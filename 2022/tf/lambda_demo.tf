resource "aws_iam_role" "student_lambda" {
  name = "student_lambda"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Sid    = ""
        Principal = {
          Service = "lambda.amazonaws.com"
        }
      },
    ]
  })
}

resource "aws_iam_role_policy" "student_lambda" {
  name = "student_lambda"
  role = aws_iam_role.student_lambda.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = [
                "logs:CreateLogGroup",
                "logs:CreateLogStream",
                "logs:PutLogEvents"
        ]
        Effect   = "Allow"
        Resource = "arn:aws:logs:us-east-1:*:log-group:/aws/lambda/*"
      },
    ]
  })
}

data "archive_file" "lambda_body" {
  type        = "zip"
  source_file = "${path.module}/src/shares.py"
  output_path = "${path.module}/shares.zip"
}

resource "aws_lambda_function" "lambda_demo" {
  filename      = "shares.zip"
  function_name = "lambda_demo"
  role          = aws_iam_role.student_lambda.arn
  handler       = "shares.lambda_handler"

  source_code_hash = data.archive_file.lambda_body.output_base64sha256

  runtime = "python3.9"
}

resource "aws_lambda_function_url" "lambda_demo_url" {
  function_name      = aws_lambda_function.lambda_demo.function_name
  authorization_type = "NONE"

  cors {
    allow_credentials = true
    allow_origins     = ["*"]
    allow_methods     = ["*"]
    allow_headers     = ["date", "keep-alive"]
    expose_headers    = ["keep-alive", "date"]
    max_age           = 86400
  }
}

output "url" {
  value = aws_lambda_function_url.lambda_demo_url.function_url
}
