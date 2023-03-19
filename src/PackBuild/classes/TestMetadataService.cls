/**
 * Test Class for Metadata Service Class
 * @author Christopher Pezza
 * @since 2023
 */
@SuppressWarnings('PMD.ApexUnitTestClassShouldHaveAsserts')
@isTest
private without sharing class TestMetadataService {
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
      if (request instanceof MetadataService.listMetadata_element) {
        response.put('response_x', new MetadataService.listMetadataResponse_element());
      }

      if (request instanceof MetadataService.describeMetadata_element) {
        response.put('response_x', new MetadataService.describeMetadataResponse_element());
      }
      return;
    }
  }

  /**
   * Test Initiating Metadata Port
   */  
  @IsTest
  private static void initiateMetdataPort() {
    System.Test.setMock(WebServiceMock.class, new WebServiceMockImpl());

    Test.startTest();
    new MetadataService.MetadataPort();
    Test.stopTest();
  }

  /**
   * Test List Metadata
   */  
  @IsTest
  private static void listMetadataTest() {
    System.Test.setMock(WebServiceMock.class, new WebServiceMockImpl());

    Test.startTest();
    MetadataService.MetadataPort metaDataPort = new MetadataService.MetadataPort();
    metaDataPort.listMetadata(null, null);
    Test.stopTest();
  }

  /**
   * Test Describe Metadata
   */  
  @IsTest
  private static void describeMetadataTest() {
    System.Test.setMock(WebServiceMock.class, new WebServiceMockImpl());

    Test.startTest();
    MetadataService.MetadataPort metaDataPort = new MetadataService.MetadataPort();
    metaDataPort.describeMetadata(null);
    Test.stopTest();
  }

  /**
   * Code Coverage for all other methods
   */  
  @IsTest
  private static void coverGeneratedCodeTypes() {
    Test.startTest();
    new MetadataService();
    new MetadataService.listMetadataResponse_element();
    new MetadataService.listMetadata_element();
    new MetadataService.ListMetadataQuery();
    new MetadataService.listMetadataResponse_element();
    new MetadataService.describeMetadata_element();
    new MetadataService.describeMetadataResponse_element();
    new MetadataService.DescribeMetadataObject();
    new MetadataService.DescribeMetadataResult();
    new MetadataService.FileProperties();
    new MetadataService.LogInfo();
    new MetadataService.SessionHeader_element();
    new MetadataService.DebuggingInfo_element();
    new MetadataService.DebuggingHeader_element();
    new MetadataService.CallOptions_element();
    new MetadataService.AllOrNoneHeader_element();
    Test.stopTest();
  }
}
