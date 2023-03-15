@isTest
private with sharing class TestMetadataUtility {
    
    @isTest
    static void testSessionId() {
        Test.startTest();
        
        String sessionId = MetadataUtility.getSessionIdFromVFPage(Page.SessionId);
        
        Test.stopTest();

        System.assertEquals('1234567890', sessionId, 'Check Session Id equals 1234567890');
    }

    @isTest
    static void testApiVersion() {
        Test.startTest();

        String apiVersion = MetadataUtility.API_VERSION;

        Test.stopTest();

        System.assertEquals('56.0', apiVersion, 'Check api is 56.0');
    }

    @isTest
    static void testPackageTypes() {
        Test.startTest();

        List<String> packageTypes = MetadataUtility.PACKAGE_TYPES;

        Test.stopTest();

        System.assertEquals(3, packageTypes.size(), 'Check 3 types returned');
    }

    @isTest
    static void testMetadataTypes() {
        Test.startTest();

        List<String> metadataTypes = MetadataUtility.METADATA_TYPES;

        Test.stopTest();

        System.assertEquals(197, metadataTypes.size(), 'Check Number of Metadata Type List');
    }
}
