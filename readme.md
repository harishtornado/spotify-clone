Request an access token:

    All the following API requests, should use an access token. We can generate one using our client id and secret. The newly generated token will be available for only 1 hour.

        curl -X POST "https://accounts.spotify.com/api/token" \
            -H "Content-Type: application/x-www-form-urlencoded" \
            -d "grant_type=client_credentials&client_id=your-client-id&client_secret=your-client-secret"

Setup the StepZen CLI:

    1.Let’s install Stepzen CLI using npm install -g stepzen.
    2.Sign up for a free StepZen account
    3.Login inside your terminal using stepzen login and provide the details from StepZen Dashboard

Create a new folder inside our React Native project, and navigate there:

    mkdir stepzen && cd stepzen

Based on the docs, we can get a list of recommendations using the following GET request:

    curl "https://api.spotify.com/v1/recommendations?seed_genres=pop" \
     -H "Authorization: Bearer your-access-token"

stepzen commands:

    stepzen login

Fetch Track Recommendations:

    stepzen import \
        curl "https://api.spotify.com/v1/recommendations?seed_genres=pop" \
        --header "Authorization: Bearer BQA3k8WQOkJRCOLkzIdHusulOZLqpYCMGDL0Z4Y9wtcFin47NlPopehFIz9nA3HkaQ_koiElb1fOauRGvWcuniRE5JWvXLK9XxqATbTFRksuKNaueOA" \
        --query-name "recommendations" \
        --query-type "Recommendation" \
        --name "recommendations" \
        --prefix "Recommend"

Deploy the GraphQL API:

    stepzen start

Generate Token Query:

    stepzen import \
        curl -X POST "https://accounts.spotify.com/api/token" \
        --header "Content-Type: application/x-www-form-urlencoded" \
        --data "grant_type=client_credentials&client_id=your-client-id&client_secret=your-client-secret" \
        --query-name "getToken" \
        --query-type "TokenResponse" \
        --name "auth"

{"access_token":"BQA3k8WQOkJRCOLkzIdHusulOZLqpYCMGDL0Z4Y9wtcFin47NlPopehFIz9nA3HkaQ_koiElb1fOauRGvWcuniRE5JWvXLK9XxqATbTFRksuKNaueOA","token_type":"Bearer","expires_in":3600}

curl -X POST "https://accounts.spotify.com/api/token" \
 -H "Content-Type: application/x-www-form-urlencoded" \
 -d "grant_type=client_credentials&client_id=33883dc016d4484288312c53860533c3&client_secret=a280449e9a03438ab3bd476f61b6ca9f"

    Generate Token Query:

    stepzen import \
        curl -X POST "https://accounts.spotify.com/api/token" \
        --header "Content-Type: application/x-www-form-urlencoded" \
        --data "grant_type=client_credentials&client_id=33883dc016d4484288312c53860533c3&client_secret=a280449e9a03438ab3bd476f61b6ca9f" \
        --query-name "getToken" \
        --query-type "TokenResponse" \
        --name "auth"

    Searching for Tracks:

        stepzen import \
            curl 'https://api.spotify.com/v1/search?q=nf&type=track' \
            --header "Authorization: Bearer BQA007GR94J6uMmlmPV2MhYevMjTxc6UogPhT_kSQrd_UmnZ4OPPi0XuaHsDsWEIJYY_Xyt7gAy3eNf1hPYjPpuhqEaWcN0n6nBQ4LT0rak8z1IvPRw" \
            --query-name "search" \
            --query-type "SearchResult" \
            --name "search" \
            --prefix "Search"

    Track Details:

        stepzen import \
            curl "https://api.spotify.com/v1/tracks/11dFghVXANMlKmJXsNCbNl" \
            --header "Authorization: Bearer BQD16_S9HrUEpXmqiG0acJvaFKkd9M3G8Qy9_O00HO0RUNFzeQK5EZzxuqmQSbC-fcyRJZJ2fLtZ_gkEJbGYszZCqWw-JY7FzJCMqcDl0UxSpsjmGk0" \
            --path-params "/v1/tracks/\$trackId"  \
            --query-name "getTrack" \
            --query-type "TrackResponse" \
            --name "track" \
            --prefix "Track"
