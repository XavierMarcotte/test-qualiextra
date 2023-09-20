import { sequelize, Admin, Etablissement, Service, Users, Cart } from './app/models/initModels.js';

try {
    await sequelize.drop({ force: true });
    await sequelize.sync({ force: true });

    await Admin.create({
        mail: 'admin@admin.com',
        role: 'admin',
        password: 'admin',
    });

    const etablissement = await Etablissement.create({
        name: "Etablissement1",
        address: "4 rue de l'établissement",
        phone: "0680907008",
        image: "/uploads/timetravel.png",
    })

    await Service.create({
        name: "Degustation",
        price: 100,
        description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum praesentium culpa animi doloremque quo fugiat tempore exercitationem nulla? Illum laborum soluta cum vitae dolores eius magni beatae consequatur voluptate possimus eum accusamus reiciendis eligendi placeat debitis omnis explicabo nihil temporibus a adipisci maiores, esse ullam. Dignissimos obcaecati adipisci labore itaque soluta doloribus vel eos, molestias deleniti saepe illum odit non. Doloremque officia cumque excepturi culpa harum, vel quos molestias aut eius debitis vero veniam error architecto sequi nulla, repellat similique asperiores eum odio quis facilis dolorum nobis? Ut minus quasi animi laudantium ad adipisci mollitia quod accusantium natus optio qui nemo quaerat nostrum ducimus vel facere commodi, id laborum tenetur velit! Nobis quisquam architecto aperiam, assumenda libero eum minima quos similique consequuntur facere quas aliquid amet, aspernatur aut corporis ipsa accusantium iste harum doloribus adipisci ad deleniti excepturi pariatur quasi! Officiis nostrum quis ipsum tenetur similique, quam deleniti id tempore.`,
        guest: "20",
        extras:[
            {
                "nomExtra": "Billard",
                "prixExtra": 15
            }
        ],
        startDate: "2023-08-20",
        endDate: "2023-09-25",
        image: "/uploads/house.png",
        etablissementId: etablissement.id,
        durationNumber: "4",
        durationUnit: "Jour",
        tags: [
            "cozy",
            "elegant"
        ],
        limit: 2,
    });
    await Service.create({
        name: "VR",
        price: 25,
        description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum praesentium culpa animi doloremque quo fugiat tempore exercitationem nulla? Illum laborum soluta cum vitae dolores eius magni beatae consequatur voluptate possimus eum accusamus reiciendis eligendi placeat debitis omnis explicabo nihil temporibus a adipisci maiores, esse ullam. Dignissimos obcaecati adipisci labore itaque soluta doloribus vel eos, molestias deleniti saepe illum odit non. Doloremque officia cumque excepturi culpa harum, vel quos molestias aut eius debitis vero veniam error architecto sequi nulla, repellat similique asperiores eum odio quis facilis dolorum nobis? Ut minus quasi animi laudantium ad adipisci mollitia quod accusantium natus optio qui nemo quaerat nostrum ducimus vel facere commodi, id laborum tenetur velit! Nobis quisquam architecto aperiam, assumenda libero eum minima quos similique consequuntur facere quas aliquid amet, aspernatur aut corporis ipsa accusantium iste harum doloribus adipisci ad deleniti excepturi pariatur quasi! Officiis nostrum quis ipsum tenetur similique, quam deleniti id tempore. `,
        guest: "2",
        extras:[
            {
                "nomExtra": "Tapis de course",
                "prixExtra": 80
            }
        ],
        startDate: "2023-08-15",
        endDate: "2023-08-29",
        image: "/uploads/virtualroom.png",
        etablissementId: etablissement.id,
        durationNumber: "2",
        durationUnit: "Heure",
        tags: [
            "nouveautes",
            "insolite"
        ],
        limit: 3,
    });
    await Service.create({
        name: "SPA",
        price: 80,
        description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum praesentium culpa animi doloremque quo fugiat tempore exercitationem nulla? Illum laborum soluta cum vitae dolores eius magni beatae consequatur voluptate possimus eum accusamus reiciendis eligendi placeat debitis omnis explicabo nihil temporibus a adipisci maiores, esse ullam. Dignissimos obcaecati adipisci labore itaque soluta doloribus vel eos, molestias deleniti saepe illum odit non. Doloremque officia cumque excepturi culpa harum, vel quos molestias aut eius debitis vero veniam error architecto sequi nulla, repellat similique asperiores eum odio quis facilis dolorum nobis? Ut minus quasi animi laudantium ad adipisci mollitia quod accusantium natus optio qui nemo quaerat nostrum ducimus vel facere commodi, id laborum tenetur velit! Nobis quisquam architecto aperiam, assumenda libero eum minima quos similique consequuntur facere quas aliquid amet, aspernatur aut corporis ipsa accusantium iste harum doloribus adipisci ad deleniti excepturi pariatur quasi! Officiis nostrum quis ipsum tenetur similique, quam deleniti id tempore.`,
        guest: "2",
        extras:[
            {
                "nomExtra": "Massage",
                "prixExtra": 50
            }
        ],
        startDate: "2023-08-14",
        endDate: "2023-08-12",
        image: "/uploads/spaclarins.png",
        etablissementId: etablissement.id,
        durationNumber: "2",
        durationUnit: "Jour",
        tags: [
            "ephemere",
            "elegant"
        ],
        limit: 4,
    });
    await Service.create({
        name: "Visite tour Eiffel",
        price: 70,
        description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum praesentium culpa animi doloremque quo fugiat tempore exercitationem nulla? Illum laborum soluta cum vitae dolores eius magni beatae consequatur voluptate possimus eum accusamus reiciendis eligendi placeat debitis omnis explicabo nihil temporibus a adipisci maiores, esse ullam. Dignissimos obcaecati adipisci labore itaque soluta doloribus vel eos, molestias deleniti saepe illum odit non. Doloremque officia cumque excepturi culpa harum, vel quos molestias aut eius debitis vero veniam error architecto sequi nulla, repellat similique asperiores eum odio quis facilis dolorum nobis? Ut minus quasi animi laudantium ad adipisci mollitia quod accusantium natus optio qui nemo quaerat nostrum ducimus vel facere commodi, id laborum tenetur velit! Nobis quisquam architecto aperiam, assumenda libero eum minima quos similique consequuntur facere quas aliquid amet, aspernatur aut corporis ipsa accusantium iste harum doloribus adipisci ad deleniti excepturi pariatur quasi! Officiis nostrum quis ipsum tenetur similique, quam deleniti id tempore.`,
        guest: "2",
        extras:[
            {
                "nomExtra": "Visite en tuk-tuk de la ville",
                "prixExtra": 25,
            },
            {
                "nomExtra": "Trocadero",
                "prixExtra": 10,
            }
        ],
        startDate: "2023-08-08",
        endDate: "2023-09-15",
        image: "/uploads/museum.png",
        etablissementId: etablissement.id,
        durationNumber: "1",
        durationUnit: "Heure",
        tags: [
            "nouveautes",
            "tendances"
        ],
        limit: 5,
    });
    
} catch (error) {
    console.error(error);
}
