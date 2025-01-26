package backend

import (
	"context"
	"fmt"
	"log"
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
	projectID := "credible-bank-198114"

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
  iter := client.Collection("iot").Documents(context.TODO())
  for {
  	doc, err := iter.Next()
  	if err == iterator.Done {
  		break
  	}
  	if err != nil {
  		log.Fatalf("Failed to iterate: %v", err)
  	}
  	fmt.Println(doc.Data())
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
  client := createClient(context.TODO())
  _data := readData(client)
  _json, err := json.Marshal(_data)
  if err != nil {
    fmt.Println("Error marshal to json")
  }
  w.Write(_json)
}
