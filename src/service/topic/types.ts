export interface Data {
  list?:           Topic[];
  pre_page_token?: string;
}

export interface Topic {
  id?:              number;
  tid?:             string;
  cid?:             number;
  title?:           string;
  intro?:           string;
  content?:         string;
  yes_ratio?:       string;
  no_ratio?:        string;
  yes_price?: string;
  no_price?:  string;
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
  category?:        category;
}

export interface category {
  id?: number;
  category_name: string;
}
