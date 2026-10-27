
const sampleItems = [
  {
    type: "Lost",
    name: "Black Wallet",
    category: "Bags & Accessories",
    location: "College Library",
    details: "Small black wallet found missing near the reading area."
  },
  {
    type: "Found",
    name: "Blue Water Bottle",
    category: "Other",
    location: "Sports Ground",
    details: "Blue reusable bottle picked up after practice."
  },
  {
    type: "Lost",
    name: "Physics Notebook",
    category: "Books & Stationery",
    location: "Block B",
    details: "Notebook with handwritten class notes."
  }
];

let items = [...sampleItems];

const itemList = document.getElementById("item-list");
const search = document.getElementById("search");
const form = document.getElementById("report-form");
const message = document.getElementById("message");

function renderItems() {
  const query = search.value.trim().toLowerCase();

  const filtered = items.filter(item =>
    [item.name, item.type, item.category,
     item.location, item.details]
      .some(value => value.toLowerCase().includes(query))
  );

  itemList.replaceChildren();

  if (filtered.length === 0) {
    itemList.textContent = "No matching reports found.";
    return;
  }

  filtered.forEach(item => {
    const card = document.createElement("article");
    card.className = "item-card";

    const tag = document.createElement("span");
    tag.className = "tag";
    tag.textContent = item.type;

    const title = document.createElement("h3");
    title.textContent = item.name;

    const category = document.createElement("p");
    category.textContent = item.category;

    const location = document.createElement("p");
    location.textContent = "📍 " + item.location;

    const details = document.createElement("p");
    details.textContent = item.details;

    card.append(tag, title, category, location, details);
    itemList.appendChild(card);
  });
}

search.addEventListener("input", renderItems);

form.addEventListener("submit", event => {
  event.preventDefault();

  const report = {
    type: document.getElementById("type").value,
    name: document.getElementById("name").value.trim(),
    category: document.getElementById("category").value,
    location: document.getElementById("location").value.trim(),
    details: document.getElementById("details").value.trim()
  };

  items.unshift(report);
  renderItems();
  form.reset();

  message.textContent =
    "Report added to this page successfully!";

  document.getElementById("items").scrollIntoView({
    behavior: "smooth"
  });
});

renderItems();
