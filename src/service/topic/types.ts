

export interface Data {
  list?:           TopicList[];
  pre_page_token?: string;
}

export interface TopicList {
  id?:              number;
  tid?:             string;
  cid?:             number;
  title?:           string;
  intro?:           string;
  content?:         string;
  yes_ratio?:       string;
  no_ratio?:        string;
  yes_ratio_price?: string;
  no_ratio_price?:  string;
  total_price?:     string;
  collect_count?:   number;
  read_count?:      number;
  img_url?:         string;
  is_stop?:         number;
  refund_end_time?: string;
  end_time?:        string;
  created_at?:      string;
  updated_at?:      string;
  deleted_at?:      string;
  is_collect?:      number;
  category?:        null;
}
