console.log("Don't even think about it ")

const server_url = "https://prorohit.pythonanywhere.com/all_posts";
link="./public/upload/"
default_posts= [
  [
    3,
    "Purple SaaS Landing",
    "Hero Section",
    "./public/default/web1.jpg",
    "https://www.figma.com/design/UOTKOFur859aPy7GMIeRLY/web-damo--Community-?node-id=0-1&p=f&t=QXbJYr6P6BA79q1m-0"
  ],
  [
    3,
    "Food Landing Page",
    "Restaurant Website",
    "./public/default/web2.jpg",
    "https://www.figma.com/design/lMspe4wY56hWJlM28ta4Xf/New-Resturent-website--Community-?node-id=0-1&p=f&t=pwTanXjyBpsCV8nL-0"
  ],
  [
    3,
    "Real Estate Landing",
    "Property Website",
    "./public/default/web3.jpg",
    "https://www.figma.com/design/Y0rd6jfqxKCj7ThD4RzYaY/New-Real-Estate-website--Community-?node-id=1-23&t=3YnLLeRTm9RgZnkn-0"
  ],
 [
    3,
    "Designer Portfolio Grid",
    "Personal Portfolio",
    "./public/default/web4.jpg",
    "https://www.figma.com/design/enhf4hdO21f2XGtWocx6Fx/Rohit-Portfolio-2-17-26--Community-?node-id=0-1&p=f&t=ZCkyKQo2DNdnfsjY-0"
  ]
]



section_element=document.querySelector(".portfolio-grid")

function add_element(title="",desc="",image_path="",post_link=""){
    element_text=`
        <a href="${post_link}">
            <div class="card">
                <div class="card-image">
                    <img src="${image_path}"
                        alt="${title}">
                    <div class="overlay"></div>
                </div>
                <div class="card-content">
                    <h3>${title}</h3>
                    <p>${desc}</p>
                </div>
            </div>
        </a>
    `
    section_element.insertAdjacentHTML( "beforeend", element_text );
}


let posts = {};


async function fetchPosts() {
  try {
    const response = await fetch(server_url, {
      method: 'GET', 
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (response.status === 201) {
      posts = await response.json(); 
      for (post of posts){
        title=post[1]
        desc=post[2]
        image_path=post[3]
        post_link=post[4]
        add_element (title, desc, `${link}${image_path}`, post_link)
      }
    } else {
      posts = default_posts;
      for (post of posts){
        title=post[1]
        desc=post[2]
        image_path=post[3]
        post_link=post[4]
        add_element (title, desc, `${image_path}`, post_link)
      }

    }
    
  } catch (e) {
    posts = default_posts;
      for (post of posts){
        title=post[1]
        desc=post[2]
        image_path=post[3]
        post_link=post[4]
        add_element (title, desc, `${image_path}`, post_link)
      }

  }

}
fetchPosts()


