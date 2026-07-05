export async function mainPage(req, res) {
  res.redirect("/pages/celula");
  // const { rows } = await Celula.findCelula();
  // console.log(req.authenticated);
  // res.send(
  //   mainPageFunction({
  //     logged: req.authenticated,
  //     rows,
  //   }),
  // );
}
