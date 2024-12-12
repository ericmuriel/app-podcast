export type Item = {
    title: Tsr;
    guid: Tsr;
    pubDate: Tsr;
    "itunes:duration": Tsr;
    "itunes:summary": Tsr;
    "itunes:subtitle": Tsr;
    description: Tsr;
    enclosure: Enclosure;
  };
  
  export type Channel = {
    "itunes:author": string;
    item: Item[];
    description: Tsr;
  };
  
  export type RSSData = {
    rss: { channel: Channel };
  };
  
  export type Tsr = {
    "#text": string;
  };
  
  export type Enclosure = {
    "@_length": string;
    "@_type": string;
    "@_url": string;
  };
  