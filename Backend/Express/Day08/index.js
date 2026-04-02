const express = require("express");
const app = express()
const BookStore = [
    { id: 1, name: "metaforsis", author: 'franzkafka' },
    { id: 2, name: "WhiteNight", author: 'Fodor ' },
    { id: 3, name: "No Hman Longer", author: 'osmu_duazi' },
    { id: 4, name: "metaforsis", author: 'franzkafka' },
    { id: 5, name: "WhiteNight", author: 'Fodor ' },
    { id: 6, name: "No Hman Longer", author: 'osmu_duazi' }
]
app.use(express.json())
app.get("/book", (req, res) => {
    const Book = BookStore.filter(info => info.author === req.query.author)
    res.send(Book);
})
app.post('/book', (req, res) => {
    BookStore.push(req.body);
    res.send("Data Saves SucessFully")
})

app.listen(3000, () => {
    console.log("Server is Now Listerning");
})
app.get('/book/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const book = BookStore.find(info => info.id === id);
    res.send(book);
})
app.patch('/book', (req, res) => {
    const book = BookStore.find(info => info.id === req.body.id);
    if (req.body.author)
        book.author = req.body.author;
    if (req.body.name)
        book.name = req.body.name

    res.send("patched");
})
app.delete("/book/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const index = BookStore.findIndex(info => info.id === id);
    BookStore.splice(index, 1);
    res.send("Data Save Succesfully")
})