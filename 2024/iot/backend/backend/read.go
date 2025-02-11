package backend

import (
	"context"
	"fmt"
	"log"
  "os"
  "net/http"
  "encoding/json"

	"google.golang.org/api/iterator"
  "github.com/GoogleCloudPlatform/functions-framework-go/functions"
	"cloud.google.com/go/firestore"
)

func init() {
   functions.HTTP("MainRead", mainRead)
}

func createClient(ctx context.Context) *firestore.Client {
	// Sets your Google Cloud Platform project ID.
  projectID := os.Getenv("PROJECT_ID")

	client, err := firestore.NewClientWithDatabase(ctx, projectID, "iot-db")
	if err != nil {
		log.Fatalf("Failed to create client: %v", err)
	}
	// Close client when done with
	// defer client.Close()
	return client
}

func readData(client *firestore.Client) []Data {
  _data := []Data{}
  //iter := client.Collection("iot").Documents(context.TODO())
  iter := client.Collection("iot").OrderBy("Timestamp", firestore.Desc).Limit(40).Documents(context.TODO())
  for {
  	doc, err := iter.Next()
  	if err == iterator.Done {
  		break
  	}
  	if err != nil {
  		log.Fatalf("Failed to iterate: %v", err)
  	}

    _d := Data{}
    err = doc.DataTo(&_d)
    if err != nil {
      fmt.Println("Error converting data")
    }
    _data = append(_data, _d)
  }

  return _data
}

func mainRead(w http.ResponseWriter, r *http.Request) {
  // Set CORS headers for the preflight request
	if r.Method == http.MethodOptions {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "POST")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
		w.Header().Set("Access-Control-Max-Age", "3600")
		w.WriteHeader(http.StatusNoContent)
		return
	}

  client := createClient(context.TODO())
  _data := readData(client)
  _json, err := json.Marshal(_data)
  if err != nil {
    fmt.Println("Error marshal to json")
  }
  w.Header().Set("Access-Control-Allow-Origin", "*")
  w.Write(_json)
}
