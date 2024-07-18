const autoresModel = require("../models/autores");
const transporter = require("../services/EmailService");

exports.getHome = (req, res, next) => {
  // Este es para presentar el home
  autoresModel.findAll().then((result) => {
    const autores = result.map((result) => result.dataValues);
    res.render("autores/home", {
      pageTitle: "CampuLibrary | Autores",
      Autores: autores,
      hasAutores: autores.length > 0,
    });
  });
};

exports.getAdmAdd = (req, res, next) => {
  //Para agregar
  res.render("autores/admAgregar", {
    pageTitle: "CampuLibrary | Agregar - Autores",
  });
};

exports.postAdmAdd = (req, res, next) => {
  //Este es para agregar
  const nombre = req.body.Nombre;
  const correo = req.body.Correo;
  autoresModel
    .create({
      autorName: nombre,
      correo,
      cantidadLibros: 0,
    })
    .then((result) => {
      // console.log(result.dataValues);
      res.redirect("/autores");
      // return transporter.sendMail({
      //   from: "CampuLibrary Company <no-reply@campulibrary.com>",
      //   to: correo,
      //   subject: `¡Bienvenido(a), Profesor ${nombre}!`,
      //   html: `
      //       <p>Hola Profesor ${nombre},</p>
      //       <p>Me complace informarle que ha sido agregado(a) a nuestra base de datos como autor(a) en CampuLibrary. Sin embargo, aquí está la parte divertida: ¡usted es mi conejillo de indias! 😜</p>
      //       <p>Decidí probar este nuevo sistema de autores con usted porque, bueno, ¿quién mejor para experimentar que mi querido profesor? Así que si algo sale mal, sepa que tiene el honor de ser el primero en descubrirlo.</p>
      //       <p>A continuación, algunos detalles sobre su cuenta:</p>
      //       <ul>
      //         <li><strong>Nombre de autor:</strong> ${nombre}</li>
      //         <li><strong>Correo electrónico registrado:</strong> ${correo}</li>
      //         <li><strong>Cantidad de libros inicial:</strong> 0</li>
      //       </ul>
      //       <p>Espero que disfrute de esta experiencia tanto como yo disfruto viendo si todo funciona como debería. Si tiene alguna pregunta o encuentra algún problema (lo cual, espero, no ocurra), no dude en contactarme.</p>
      //       <p>¡Gracias por su paciencia y sentido del humor!</p>
      //       <br>
      //       <p>Saludos cordiales,</p>
      //       <p>El equipo de CampuLibrary</p>
      //       <p><small>Este es un correo generado automáticamente, por favor no responda a este mensaje.</small></p>
      //     `,
      // });
      return transporter.sendMail(
        {
          from: "CampuLibrary Company <no-reply@campulibrary.com>",
          to: correo,
          subject: `¡Bienvenido(a), ${nombre}!`,
          html: `
            <p>Estimado(a) ${nombre},</p>
            <p>Nos complace informarle que ha sido agregado(a) a nuestra base de datos como autor(a) en CampuLibrary.</p>
            <p>A partir de ahora, podrá gestionar sus libros y publicaciones a través de nuestra plataforma. Estamos emocionados de ver sus futuras contribuciones y estamos aquí para apoyar su viaje como autor(a).</p>
            <p>Si tiene alguna pregunta o necesita asistencia, no dude en ponerse en contacto con nosotros.</p>
            <p>¡Bienvenido(a) una vez más a CampuLibrary!</p>
            <br>
            <p>Atentamente,</p>
            <p>El equipo de CampuLibrary</p>
            <p><small>Este es un correo generado automáticamente, por favor no responda a este mensaje.</small></p>
          `,
        },
        (err) => {
          console.log(err);
        }
      );
    })
    .catch((error) => {
      console.log(error);
    });
};

exports.getAdmEdd = (req, res, next) => {
  // Este es para editar
  const elemetnID = req.params.elemetnId;
  autoresModel
    .findOne({ where: { id: elemetnID } })
    .then((result) => {
      if (result) {
        res.render("autores/admEditar", {
          pageTitle: `CampuLibrary | Editar - ${result.autorName}`,
          Autor: result.dataValues,
        });
      } else {
        res.redirect("/autores");
      }
    })
    .catch((err) => {
      console.error("Error al eliminar al autor: ", err);
      res.redirect("/autores");
    });
};

exports.postEditar = (req, res, next) => {
  const autorId = req.body.elemetnId;
  const nombre = req.body.Nombre;
  const correo = req.body.Correo;

  autoresModel
    .update({ autorName: nombre, correo }, { where: { id: autorId } })
    .then(() => {
      return res.redirect("/autores");
    })
    .catch((error) => {
      console.log(error);
    });
};

exports.postEliminar = (req, res, next) => {
  const idElemt = req.body.elemetnId;
  autoresModel
    .findOne({ where: { id: idElemt } })
    .then((result) => {
      if (result) {
        return result.destroy();
      } else {
        console.log("Autor no encontrado");
        res.redirect("/autores");
      }
    })
    .then(() => {
      console.log("Autor eliminado");
      res.redirect("/autores");
    })
    .catch((err) => {
      console.error("Error al eliminar al autor: ", err);
      res.redirect("/autores");
    });
};
