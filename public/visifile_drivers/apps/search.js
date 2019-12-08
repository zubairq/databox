function(args) {
/*
is_app(true)
display_name("Search app")
description("This will return the search app")
base_component_id("search")
load_once_from_file(true)
logo_url("data:image/jpeg;base64,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")
*/

    Vue.component("search",{
      template: "<div v-on:click='search'>Search app {{msg}}</div>"
      ,
      data: function() {
       return {
         msg: "..."
     }
      },
    methods: {
        search: function() {
            var mm = this
            callDriverMethod( "commandLine",
                              "ls"
                              ,{}
                        ,
                        function(result) {
                          //  console.log("3) returned result: " + JSON.stringify(result,null,2))
                            mm.msg =result
                        })

        }
    }
    })


    return {name: "search"}


}
