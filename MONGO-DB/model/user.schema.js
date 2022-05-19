db.createCollection("posts", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["name", "age", "place", "email", "comments"],
            properties: {
                name: {
                    bsonType: "string",
                    description: "must be a string and is required",
                },
                age: {
                    bsonType: "number",
                    description: "must be a string and is required",
                },
                place: {
                    bsonType: "string",
                    description: "must be a number and is required",
                },
                email: {
                    bsonType: "string",
                    description: "must be a string and is required",
                },
                comments: {
                    bsonType: "array",
                    description: "must be and array and is required",
                    items: {
                        bsonType: "object",
                        required: ["text", "userId"],
                        properties: {
                            text: {
                                bsonType: "string",
                                description: "must be a string and is required",
                            },
                            userId: {
                                bsonType: "Object",
                                description: "must be a string and is required",
                            },
                        },
                    },
                },
            },
        },
    },
    validationAction: "warn",
});
