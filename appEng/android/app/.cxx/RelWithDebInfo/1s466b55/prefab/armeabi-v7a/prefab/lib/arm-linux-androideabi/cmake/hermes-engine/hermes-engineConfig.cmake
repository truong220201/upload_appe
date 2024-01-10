if(NOT TARGET hermes-engine::libhermes)
add_library(hermes-engine::libhermes SHARED IMPORTED)
set_target_properties(hermes-engine::libhermes PROPERTIES
    IMPORTED_LOCATION "/Users/sonluu/.gradle/caches/transforms-3/29d475f7f90ec3a7f042ea8b82f94520/transformed/jetified-hermes-android-0.72.6-release/prefab/modules/libhermes/libs/android.armeabi-v7a/libhermes.so"
    INTERFACE_INCLUDE_DIRECTORIES "/Users/sonluu/.gradle/caches/transforms-3/29d475f7f90ec3a7f042ea8b82f94520/transformed/jetified-hermes-android-0.72.6-release/prefab/modules/libhermes/include"
    INTERFACE_LINK_LIBRARIES ""
)
endif()

