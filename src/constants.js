export default {
    headers: [
        {
            key: "Name",
            width: "25%",
            sortable: true
        },
        {
            key: "Age",
            width: "25%",
            sortable: true
        },
        {
            key: "Company",
            width: "25%",
            sortable: false
        },
        {
            key: "Salary",
            width: "25%",
            sortable: true
        }
      ],
      expandableHeaders: [
        {
            key: "Name",
            width: "25%",
            sortable: true,
            child:{
                key: "id"
            }
        },
        {
            key: "Age",
            width: "25%",
            child: {
                key: "user"
            }
        },
        {
            key: "Company",
            width: "25%",
            child: {
                key: "key"
            }
        },
        {
            key: "Salary",
            width: "25%",
            child: {
                key: "desc"
            }
        } 
      ]
}