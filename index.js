import e from "express";

const app = e();
const port = 8800;

app.listen(port, () => {
  console.log(`listening at port ${port}`);
});
