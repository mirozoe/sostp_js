pipeline {
  agent any
  stages {
    stage("Test") {
      agent {
        docker {
           image "alpine:3.17.2"
        }
      }
      steps {
        sh "apk add python3 && apk add py3-pip && pip3 install boto3"
        sh "python3 -m unittest tf/src/shares.py"
      }
    }
    stage("Deploy") {
      environment {
        AWS_ACCESS_KEY_ID     = credentials("aws_access_id")
        AWS_SECRET_ACCESS_KEY = credentials("aws_key")
        REGION                = "us-east-1"
        LAMBDA                = "lambda_demo"
      }
      steps {
        script {
          FUN_EXISTS = sh( script: "aws lambda get-function --function-name ${LAMBDA} --region ${REGION}", returnStatus: true)
          sh "cd tf/src && zip shares.zip shares.py && mv shares.zip ../.."

          if ( FUN_EXISTS == 0) {
            sh "aws lambda update-function-code --function-name ${LAMBDA} --zip-file fileb://${WORKSPACE}/shares.zip --region ${REGION}"
          } else {
            sh "aws lambda create-function --function-name ${LAMBDA} --zip-file shares.zip --region ${REGION}"
          }
        }
      }
    }
  }
}

