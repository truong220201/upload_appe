if(NOT TARGET fbjni::fbjni)
add_library(fbjni::fbjni SHARED IMPORTED)
set_target_properties(fbjni::fbjni PROPERTIES
    IMPORTED_LOCATION "/Users/sonluu/.gradle/caches/transforms-3/747e2e8b364eedfe9f0f0ec569b5eafd/transformed/jetified-fbjni-0.3.0/prefab/modules/fbjni/libs/android.arm64-v8a/libfbjni.so"
    INTERFACE_INCLUDE_DIRECTORIES "/Users/sonluu/.gradle/caches/transforms-3/747e2e8b364eedfe9f0f0ec569b5eafd/transformed/jetified-fbjni-0.3.0/prefab/modules/fbjni/include"
    INTERFACE_LINK_LIBRARIES ""
)
endif()

