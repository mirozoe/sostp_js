pipeline {
  agent any
  stages {
    stage("Test") {
      steps {
        sh "cd tf/src"
        sh "python3 -m unittest shares.py"
      }
    }
    stage("Deploy") {
      agent {
        docker {
          image "amazon/aws-cli:2.11.7
        }
      }
      steps {
        sh "aws --version"
      }
    }
  }
}
