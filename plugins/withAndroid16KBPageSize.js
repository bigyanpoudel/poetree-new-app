const { withGradleProperties, withAppBuildGradle } = require('@expo/config-plugins');

/**
 * Config plugin to enable 16 KB page size support for Android 15+
 * This ensures native libraries are properly aligned for devices with 16 KB memory pages
 */
const withAndroid16KBPageSize = (config) => {
  // Step 1: Add gradle.properties configuration
  config = withGradleProperties(config, (config) => {
    const gradleProperties = config.modResults;

    // Add or update the EXT_OPTIMIZE_16KB_PAGE_SIZE property
    const pageSize16KBIndex = gradleProperties.findIndex(
      (item) => item.type === 'property' && item.key === 'EXT_OPTIMIZE_16KB_PAGE_SIZE'
    );

    if (pageSize16KBIndex >= 0) {
      // Update existing property
      gradleProperties[pageSize16KBIndex].value = 'true';
    } else {
      // Add new property
      gradleProperties.push({
        type: 'property',
        key: 'EXT_OPTIMIZE_16KB_PAGE_SIZE',
        value: 'true',
      });
    }

    return config;
  });

  // Step 2: Update app/build.gradle to ensure proper compilation
  config = withAppBuildGradle(config, (config) => {
    let buildGradle = config.modResults.contents;

    // Ensure we're using the latest compile and target SDK
    if (!buildGradle.includes('compileSdk = 35')) {
      buildGradle = buildGradle.replace(
        /compileSdk\s*=\s*\d+/,
        'compileSdk = 35'
      );
    }

    if (!buildGradle.includes('targetSdk = 35')) {
      buildGradle = buildGradle.replace(
        /targetSdk\s*=\s*\d+/,
        'targetSdk = 35'
      );
    }

    // Add packaging options for native libraries if not present
    const packagingOptionsPattern = /packagingOptions\s*\{[\s\S]*?\}/;
    if (!packagingOptionsPattern.test(buildGradle)) {
      // Find the android block and add packaging options
      const androidBlockPattern = /(android\s*\{[\s\S]*?)(buildTypes\s*\{)/;
      if (androidBlockPattern.test(buildGradle)) {
        buildGradle = buildGradle.replace(
          androidBlockPattern,
          `$1    packagingOptions {
        jniLibs {
            useLegacyPackaging = false
        }
    }

    $2`
        );
      }
    }

    config.modResults.contents = buildGradle;
    return config;
  });

  return config;
};

module.exports = withAndroid16KBPageSize;
