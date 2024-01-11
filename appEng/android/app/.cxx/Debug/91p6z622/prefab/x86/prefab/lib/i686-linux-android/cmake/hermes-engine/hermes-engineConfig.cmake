if(NOT TARGET hermes-engine::libhermes)
add_library(hermes-engine::libhermes SHARED IMPORTED)
set_target_properties(hermes-engine::libhermes PROPERTIES
    IMPORTED_LOCATION "/Users/sonluu/.gradle/caches/transforms-3/9b0aa26e33f0a6d96e4efa250a17647b/transformed/jetified-hermes-android-0.72.6-debug/prefab/modules/libhermes/libs/android.x86/libhermes.so"
    INTERFACE_INCLUDE_DIRECTORIES "/Users/sonluu/.gradle/caches/transforms-3/9b0aa26e33f0a6d96e4efa250a17647b/transformed/jetified-hermes-android-0.72.6-debug/prefab/modules/libhermes/include"
    INTERFACE_LINK_LIBRARIES ""
)
endif()

