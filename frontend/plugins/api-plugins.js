import apis from "@/api/index"

export default (ctx, inject) => {
  var apiObject = {}
  for (var i in apis) {
    apiObject[i] = apis[i](ctx.$axios)
  }
  inject("api", apiObject)
}