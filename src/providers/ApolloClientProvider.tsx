import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { PropsWithChildren } from "react";

const client = new ApolloClient({
  uri: "https://aldama.stepzen.net/api/austere-sloth/__graphql",
  headers: {
    Authorization:
      "apikey aldama::stepzen.net+1000::773f4e6ef885161bbec2a10751281c6418813cca74c2d6e14aed84aaf73af061",
  },
  cache: new InMemoryCache(),
});

const ApolloClientProvider = ({ children }: PropsWithChildren) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
export default ApolloClientProvider;
