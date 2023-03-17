@isTest
private with sharing class TestMetadataUtility {
  @isTest
  static void testSessionId() {
    Test.startTest();

    String sessionId = MetadataUtility.getSessionIdFromVFPage(Page.SessionId);

    Test.stopTest();

    Assert.areEqual('1234567890', sessionId, 'Check Session Id equals 1234567890');
  }

  @isTest
  static void testApiVersion() {
    Test.startTest();

    String apiVersion = MetadataUtility.API_VERSION;

    Test.stopTest();

    Assert.isNotNull(apiVersion, 'Check api is not null');
  }

  @isTest
  static void testPackageTypes() {
    Test.startTest();

    List<String> packageTypes = MetadataUtility.PACKAGE_TYPES;

    Test.stopTest();

    Assert.areEqual(3, packageTypes.size(), 'Check 3 types returned');
  }

  @isTest
  static void testMetadataTypes() {
    Test.startTest();

    List<String> metadataTypes = MetadataUtility.METADATA_TYPES;

    Test.stopTest();

    Assert.areEqual(168, metadataTypes.size(), 'Check Number of Metadata Type List');
  }

  @isTest
  static void testDefaultValue() {
    Test.startTest();

    String result = MetadataUtility.getSystemProperty('Test', 'Test', 'Good');

    Test.stopTest();

    Assert.areEqual('Good', result, 'Check default value is returned');
  }
}
