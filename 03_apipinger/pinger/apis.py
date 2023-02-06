API_ID_LIST = [
    "https://api.jikan.moe/v4/anime/{id}",
]
API_NAME_LIST = [
    "https://api.genderize.io/?name={name}",
    "https://api.agify.io/?name={name}",
]
API_ZIP_CODE_LIST = [
    "https://api.zippopotam.us/pl/{zip_code}",
]

APIS = {
    "zip_code": API_ZIP_CODE_LIST,
    "name": API_NAME_LIST,
    "id": API_ID_LIST,
}
