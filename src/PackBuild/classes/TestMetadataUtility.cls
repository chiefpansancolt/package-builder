/**
 * Test Class for MetadataUtility Class
 * @author Christopher Pezza
 * @since 2023
 */
@isTest
private with sharing class TestMetadataUtility {
  /**
   * Mock Webservice for MetadataService
   */
  private class WebServiceMockImpl implements WebServiceMock {
    /**
     * Do Invoke method for webservice
     * @param stub
     * @param request
     * @param response
     * @param endpoint
     * @param soapAction
     * @param requestName
     * @param responseNS
     * @param responseName
     * @param responseType
     */
    @SuppressWarnings('PMD.ExcessiveParameterList')
    public void doInvoke(
      Object stub,
      Object request,
      Map<String, Object> response,
      String endpoint,
      String soapAction,
      String requestName,
      String responseNS,
      String responseName,
      String responseType
    ) {
      MetadataService.DescribeMetadataObject prop1 = new MetadataService.DescribeMetadataObject();
      prop1.childXmlNames = new List<String>{};
      prop1.directoryName = '';
      prop1.inFolder = false;
      prop1.metaFile = false;
      prop1.suffix = null;
      prop1.xmlName = 'ApexClass';

      MetadataService.DescribeMetadataObject prop2 = new MetadataService.DescribeMetadataObject();
      prop2.childXmlNames = new List<String>{};
      prop2.directoryName = '';
      prop2.inFolder = false;
      prop2.metaFile = false;
      prop2.suffix = null;
      prop2.xmlName = 'ApexTrigger';

      MetadataService.DescribeMetadataObject prop3 = new MetadataService.DescribeMetadataObject();
      prop3.childXmlNames = new List<String>{ 'Test' };
      prop3.directoryName = '';
      prop3.inFolder = false;
      prop3.metaFile = false;
      prop3.suffix = null;
      prop3.xmlName = 'ApexPage';

      MetadataService.DescribeMetadataResult prop4 = new MetadataService.DescribeMetadataResult();
      prop4.metadataObjects = new List<MetadataService.DescribeMetadataObject>{ prop1, prop2, prop3 };
      prop4.organizationNamespace = null;
      prop4.partialSaveAllowed = false;
      prop4.testRequired = false;

      MetadataService.describeMetadataResponse_element element = new MetadataService.describeMetadataResponse_element();
      element.result = prop4;

      if (request instanceof MetadataService.describeMetadata_element) {
        response.put('response_x', element);
      }
      return;
    }
  }

  /**
   * Test Get Session Id
   */
  @isTest
  static void testSessionId() {
    Test.startTest();

    String sessionId = MetadataUtility.getSessionIdFromVFPage(Page.SessionId);
    Test.stopTest();
    Assert.areEqual('1234567890', sessionId, 'Check Session Id equals 1234567890');
  }

  /**
   * Test API Version retrieve
   */
  @isTest
  static void testApiVersion() {
    Test.startTest();
    String apiVersion = MetadataUtility.API_VERSION;
    Test.stopTest();

    Assert.isNotNull(apiVersion, 'Check api is not null');
  }

  /**
   * Get List of Metadata Types
   */
  @isTest
  static void testGetMetadataTypes() {
    System.Test.setMock(WebServiceMock.class, new WebServiceMockImpl());

    Test.startTest();
    List<MetadataSelector.KeyValuePair> results = (List<MetadataSelector.KeyValuePair>) JSON.deserialize(
      MetadataUtility.getMetadataTypes(),
      List<MetadataSelector.KeyValuePair>.class
    );
    Test.stopTest();

    Assert.areEqual(4, results.size(), 'Check Metadata Types returned');
  }

  /**
   * Get List of Package Types
   */
  @isTest
  static void testPackageTypes() {
    Test.startTest();
    List<String> packageTypes = MetadataUtility.PACKAGE_TYPES;
    Test.stopTest();

    Assert.areEqual(3, packageTypes.size(), 'Check 3 types returned');
  }

  /**
   * Get Old Metadata Types Not used anymore
   */
  @isTest
  static void testMetadataTypes() {
    Test.startTest();
    List<String> metadataTypes = MetadataUtility.METADATA_TYPES;
    Test.stopTest();

    Assert.areEqual(0, metadataTypes.size(), 'Check Number of Metadata Type List');
  }

  /**
   * Get a System Property of the Default value if not found
   */
  @isTest
  static void testDefaultValue() {
    Test.startTest();
    String result = MetadataUtility.getSystemProperty('Test', 'Test', 'Good');
    Test.stopTest();

    Assert.areEqual('Good', result, 'Check default value is returned');
  }
}
