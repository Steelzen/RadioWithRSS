function fetching() {
  const proxyUrl = "http://localhost:3000/proxy?url="; // server side proxy url
  const rssUrl =
    proxyUrl +
    encodeURIComponent("https://www.nasa.gov/rss/dyn/breaking_news.rss"); // rss url

  fetch(rssUrl)
    .then((response) => response.text())
    .then((xmlString) => {
      // Parse the XML response and process the data as needed
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlString, "text/xml");

      const items = xmlDoc.querySelectorAll("item");

      const result = document.getElementById("data");
      result.innerHTML = ""; // Clear previous content if any

      items.forEach((item) => {
        const title = item.querySelector("title").textContent;
        const description = item.querySelector("description").textContent;

        const itemContainer = document.createElement("div");
        const titleElement = document.createElement("h2");
        const descriptionElement = document.createElement("p");

        titleElement.textContent = title;
        descriptionElement.textContent = description;

        itemContainer.appendChild(titleElement);
        itemContainer.appendChild(descriptionElement);

        result.appendChild(itemContainer);
      });
    })
    .catch((error) => {
      console.error("Error fetching RSS feed:", error);
    });
}

fetching();
