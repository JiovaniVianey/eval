pipeline {
  agent any
  triggers { githubPush() }

  environment {
    REGISTRY      = 'ghcr.io'
    IMAGE_NAME    = "${REGISTRY}/${env.GITHUB_REPOSITORY}:${env.GIT_COMMIT}"
    DOCKER_BUILDKIT = '1'
  }

  stages {
    stage('Checkout') {
      steps { checkout scm }
    }

    stage('Build & Test') {
        agent {
            docker {
            image 'node:20-alpine'
            args  '-v /var/run/docker.sock:/var/run/docker.sock'
            reuseNode true                // ← même workspace, pas de “@2”
            }
        }
        options { skipDefaultCheckout() } // garde 1 seul clone (celui du stage Checkout)
        steps {
            sh 'npm install'                // ou npm ci si lockfile présent
            sh 'npm run lint'
            sh 'npm test -- --coverage'
        }
        post {
            always {
            junit 'coverage/junit.xml'
            cobertura coberturaReportFile: 'coverage/cobertura-coverage.xml', failNoReports: false
            }
        }
    }

    stage('Build Docker Image') {
      agent {
        docker {
          image 'docker:24-cli'
          args  '-v /var/run/docker.sock:/var/run/docker.sock'
        }
      }
      steps { sh 'docker build -t $IMAGE_NAME .' }
    }

    stage('Push image') {
      when { branch 'main' }
      steps {
        withCredentials([string(credentialsId: 'ghcr-token', variable: 'TOKEN')]) {
          sh '''
            echo $TOKEN | docker login $REGISTRY -u $GITHUB_ACTOR --password-stdin
            docker push $IMAGE_NAME
          '''
        }
      }
    }

    stage('Deploy to Test') {
      when { branch 'main' }
      steps {
        sshagent(credentials: ['deploy-key']) {
          sh '''
            ssh user@server "\
              cd /opt/ci-cd-nodejs && \
              docker compose pull app && \
              docker compose up -d --force-recreate"
          '''
        }
      }
    }
  }
}
