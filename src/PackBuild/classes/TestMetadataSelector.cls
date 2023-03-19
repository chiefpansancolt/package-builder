/**
 * Test Class for Metadata Selector Class
 * @author Christopher Pezza
 * @since 2023
 */
@isTest
private with sharing class TestMetadataSelector {
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
    @SuppressWarnings('PMD.ExcessiveParameterList, PMD.AvoidNonExistentAnnotations')
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
      MetadataService.FileProperties prop1 = new MetadataService.FileProperties();
      prop1.id = '123145646';
      prop1.fullName = 'TestClass1';
      prop1.fileName = 'classes/TestClass1';
      prop1.manageableState = 'unmanaged';
      prop1.namespacePrefix = null;
      prop1.type_x = 'ApexClass';

      MetadataService.FileProperties prop2 = new MetadataService.FileProperties();
      prop2.id = '12354689';
      prop2.fullName = 'TEST__TestClass2';
      prop2.fileName = 'classes/TEST__TestClass2';
      prop2.manageableState = 'managed';
      prop2.namespacePrefix = 'TEST';
      prop2.type_x = 'ApexClass';

      MetadataService.FileProperties prop3 = new MetadataService.FileProperties();
      prop3.id = '1234567894';
      prop3.fullName = 'TEST__TestClass2';
      prop3.fileName = 'reports/unfiled$public/report1';
      prop3.manageableState = 'unmanaged';
      prop3.namespacePrefix = null;
      prop3.type_x = 'Report';

      MetadataService.listMetadataResponse_element element = new MetadataService.listMetadataResponse_element();
      element.result = new List<MetadataService.FileProperties>{ prop1, prop2, prop3 };

      if (request instanceof MetadataService.listMetadata_element) {
        response.put('response_x', element);
      }
      return;
    }
  }

  /**
   * Test Get Metadata with Package type all
   */
  @isTest
  static void testGetMetadataAll() {
    System.Test.setMock(WebServiceMock.class, new WebServiceMockImpl());

    Test.startTest();
    String data = MetadataSelector.listMetadata('ApexClass', new List<String>(), 'all');
    Test.stopTest();

    List<MetadataSelector.fileProperty> results = formatResults(data);

    Assert.areEqual(3, results.size(), 'Check that two are returned');
  }

  /**
   * Get Metadata with a folder with package type all
   */
  @isTest
  static void testGetMetadataAllWithFolders() {
    System.Test.setMock(WebServiceMock.class, new WebServiceMockImpl());

    Test.startTest();
    String data = MetadataSelector.listMetadata('Report', new List<String>{ 'unfiled$public' }, 'all');
    Test.stopTest();

    List<MetadataSelector.fileProperty> results = formatResults(data);

    Assert.areEqual(3, results.size(), 'Check that one is returned');
  }

  /**
   * Get Metadata with Package Type unmanaged only
   */
  @isTest
  static void testGetMetadataUnmanaged() {
    System.Test.setMock(WebServiceMock.class, new WebServiceMockImpl());

    Test.startTest();
    String data = MetadataSelector.listMetadata('ApexClass', new List<String>(), 'unmanagedOnly');
    Test.stopTest();

    List<MetadataSelector.fileProperty> results = formatResults(data);
    Assert.areEqual(2, results.size(), 'Check that one is returned');
    Assert.areEqual(null, results[0].namespacePrefix, 'check only unmanaged is returned');
    Assert.areEqual('unmanaged', results[0].manageableState, 'check only unmanaged is returned');
  }

  /**
   * Get Metadata with package type managed only
   */
  @isTest
  static void testGetMetadataManaged() {
    System.Test.setMock(WebServiceMock.class, new WebServiceMockImpl());

    Test.startTest();
    String data = MetadataSelector.listMetadata('ApexClass', new List<String>(), 'managedOnly');
    Test.stopTest();

    List<MetadataSelector.fileProperty> results = formatResults(data);
    Assert.areEqual(1, results.size(), 'Check that one is returned');
    Assert.areEqual('TEST', results[0].namespacePrefix, 'check only managed is returned');
    Assert.areEqual('managed', results[0].manageableState, 'check only managed is returned');
  }

  /* Deprecated not used anymore */
  @SuppressWarnings('PMD.ApexUnitTestClassShouldHaveAsserts, PMD.EmptyStatementBlock')
  @isTest
  static void testGetMetadataInvalidMetadata() {
  }

  /**
   * Get Metadata with an invalid package type
   */
  @isTest
  static void testGetMetadataInvalidPackage() {
    System.Test.setMock(WebServiceMock.class, new WebServiceMockImpl());
    String data;
    String error;

    Test.startTest();
    try {
      data = MetadataSelector.listMetadata('ApexClass', new List<String>(), 'test');
    } catch (Exception ex) {
      error = ex.getMessage();
    }
    Test.stopTest();

    Assert.areEqual(null, data, 'Check that null is returned');
    Assert.areEqual(System.Label.Invlid_Package_Types, error, 'Check Package Type Error Message');
  }

  /**
   * Get list folders for Email Template Metadata type
   */
  @SuppressWarnings('PMD.ApexUnitTestClassShouldHaveAsserts')
  @isTest
  static void testListFolders1() {
    Test.startTest();
    MetadataSelector.listFolders('EmailTemplate');
    Test.stopTest();
  }

  /**
   * Get List folders for Report metadata type
   */
  @SuppressWarnings('PMD.ApexUnitTestClassShouldHaveAsserts')
  @isTest
  static void testListFolders2() {
    Test.startTest();
    MetadataSelector.listFolders('Report');
    Test.stopTest();
  }

  /**
   * Format Results for assertion usage
   * @param data data returned from method
   * @return  `List<MetadataSelector.fileProperty>`
   */
  private static List<MetadataSelector.fileProperty> formatResults(String data) {
    List<MetadataSelector.fileProperty> props = (List<MetadataSelector.fileProperty>) JSON.deserialize(
      data,
      List<MetadataSelector.fileProperty>.class
    );

    return props;
  }
}
