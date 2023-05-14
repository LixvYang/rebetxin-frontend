import { SITE_URL } from "@/service/request/config";

export const formatedCreatedTime = (dataTimeString: string) => {
  const datePart = dataTimeString.substring(0, 10);
  const timePart = dataTimeString.substring(11, 19);
  const dateTime = new Date(`${datePart}T${timePart}`);
  const formattedDateTime = dateTime.toLocaleString('zh-CN', { hour12: false });
  return formattedDateTime;
}

export const formattedTotalPrice = (price: any) => {
  if (price >= 10000) {
    return (Math.round(price / 1000) / 10) + '万';
  } else {
    return price;
  }
}

export const handleShareClick = (tid: string,intro: string, img_url: string, title: string) => {
  const data = {
    action: `${SITE_URL}/main/topic/${tid}`,
    app_id: "c1412f68-6152-40ad-a193-f7fadf9328a1",
    description: `${intro}`,
    icon_url: `${img_url}`,
    title: `${title}`
  };
  window.open("mixin://send?category=app_card&data=" + encodeURIComponent(btoa(JSON.stringify(data))))
}


